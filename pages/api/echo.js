import addon from "napi-physics-modeling-oop";

export default async function echo(req, res) {
  if (req.query.type == "2D") {
    const { lambda, tau, n1 } = req.query;
    const condition = [+lambda, +tau, +n1];

    const data = await addon.addonFDTD.getFDTD_2D(condition);
    console.log("----------------------------")
  
     const dataX2 = data.dataX.map((el, i) => {if((i % 10) == 0) return el})
        console.log(data.dataX2);
    res.status(200).json({
       dataX2,
      // dataY: data.dataY,
      // row: data.row,
      // col: data.col,
      dataX: [[2,3],[2,3]],
      dataY: [[2,3],[2,3]],
      row: 2,
      col: 2,
    });
    console.log("=========================");
  } else if (req.query.type == "3D") {
    const { lambda, beamsize, n1 } = req.query;
    const condition = [+lambda, +beamsize, +n1];

    const data = await addon.addonFDTD.getFDTD_3D(condition);
    res.status(200);
    res.json({
      dataX: data.dataX,
      dataY: data.dataY,
      dataEz: data.dataEz,
      dataHy: data.dataHy,
      dataHx: data.dataHx,
      dataEnergy: data.dataEnergy,
      row: data.row,
      col: data.col,
      eachNumStep: data.eachNumStep,
    });
  } else if (req.query.type == "main") {

    const data = [];
    data.length = 1e5;
    data.fill(5);

    res.status(200);
    res.json({
      isOK: true,
      data
    });
  }
}
