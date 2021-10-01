import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {
  CONTINUE_NAME,
  BEAMSIZE_NAME,
  PAUSE_NAME,
  REFRACTIVE_INDEX_NAME,
  STEP_NUMBER_NAME,
  WAVE_LENGTH_NAME,
} from 'names/lab2.name';
import classes from './lab3.module.scss';
import { HeatMap, Sidebar, TextInput, Paper } from 'components';

import { SERVER_URL } from 'constants/url';
import MainLayout from 'layout/MainLayout';

const min = -1;
const max = 1.1;

export default function Index() {
  const [beamsize, setBeamsize] = useState<number>(3);
  const [lambda, setLambda] = useState<number>(1);
  const [n1, setN1] = useState<number>(1);

  const [step, setStep] = useState<number>(0);
  const [simulation, setSimulation] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);

  type dataType = {
    dataX: number[];
    dataY: number[];
    dataEz: number[];
    dataHx: number[];
    dataHy: number[];
    dataEnergy: number[];
    row: number;
    col: number;
    step: number;
  };
  const initAllData: dataType = {
    dataX: [],
    dataY: [],
    dataEz: [],
    dataHx: [],
    dataHy: [],
    dataEnergy: [],
    row: 0,
    col: 0,
    step: 0,
  };

  const [allData, setAllData] = useState<dataType>(initAllData);

  useEffect(() => {
   subscribe();
  }, []);

  const subscribe = async () => {
    const eventSource = new EventSource(SERVER_URL + `lab2/connect`);

    eventSource.onopen = function () {
      console.log('Event: open');
    };

    eventSource.onerror = function () {
      console.log('Event: error');
    };

    setPause(false);

    eventSource.onmessage = function (event) {
      let data = JSON.parse(event.data);
      setAllData(data);

      setStep(data.step || 0);

      console.log(Math.min(...data.dataEnergy));
      console.log(Math.max(...data.dataEnergy));
    };
  };

  const sendConditions = (reload = true) => {
    (async function () {
      await axios.post(SERVER_URL + 'lab2/nextLayer', {
        lambda,
        beamsize,
        n1,
        reload,
        type: '3D',
      });
    })();
  };

  const pauseDataReceiving = () => {
    (async function () {
      await axios.get(SERVER_URL + 'lab2/pause');
    })();
  };

  return (
    <>
    <MainLayout title={'Wave optics | Lab 3'}>
      <div className="d-flex bg-light align-items-stretch mh-100">
        <Sidebar>
          <TextInput
            value={ typeof lambda === 'number' ? lambda : 0 }
            label={ WAVE_LENGTH_NAME }
            onChange={(e) => setLambda(+e.target.value)}/>
          <TextInput
            label={ REFRACTIVE_INDEX_NAME }
            value={n1}
            onChange={(e) => setN1(+e.target.value)}
          />
          <TextInput
            label={ BEAMSIZE_NAME }
            value={ beamsize }
            onChange={(e) => setBeamsize(+e.target.value)}
          />
          <TextInput
            label={STEP_NUMBER_NAME}
            value={step}
            readOnly={true}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              sendConditions();
              setSimulation(true);
            }}
            type="button"
            className={"btn btn-primary mt-2 " + classes.button}
          >
            СТАРТ
          </button>
          <button
            type="button"
            className={"btn btn-primary  mt-2 " + classes.button}
            disabled={!simulation}
            onClick={(e) => {
              e.preventDefault();
              if (!pause) {
                pauseDataReceiving();
              } else {
                sendConditions(false);
              }
              setPause((pause) => !pause);
            }}
            >{pause ? CONTINUE_NAME : PAUSE_NAME}</button>
          </Sidebar>
        <div className="p-4 bd-highlight">

      <div className="container">

        <div className="row">
          <div className="col">
            <Paper >
              <h3><span className="badge bg-primary">Ez</span></h3>
              <HeatMap
                minVal={min}
                maxVal={max}
                dataX={allData.dataX}
                dataY={allData.dataY}
                dataVal={allData.dataEz}
              />
            </Paper>
          </div>

          <div className="col">
            <Paper >

                <h3><span className="badge bg-primary">Hy</span></h3>
                <HeatMap
                  minVal={min}
                  maxVal={max}
                  dataX={allData.dataX}
                  dataY={allData.dataY}
                  dataVal={allData.dataHy}
                />

            </Paper >
        </div>
        </div>
        <div className="row">
          <div className="col">
            <Paper >

                <h3><span className="badge bg-primary">Hx</span></h3>
                <HeatMap
                  minVal={min}
                  maxVal={max}
                  dataX={allData.dataX}
                  dataY={allData.dataY}
                  dataVal={allData.dataHx}
                />

            </Paper >
          </div>
            <div className="col ">
            <Paper >
                <h3><span className="badge bg-primary">Energy</span></h3>
                <HeatMap
                  minVal={min}
                  maxVal={max}
                  dataX={allData.dataX}
                  dataY={allData.dataY}
                  dataVal={allData.dataEnergy}
                />
            </Paper>
            </div>
        </div>
      </div>
        </div>
      </div>
    </MainLayout>

      </>
  );
}
