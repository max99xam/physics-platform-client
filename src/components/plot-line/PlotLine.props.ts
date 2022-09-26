import { DetailedHTMLProps, HTMLAttributes } from "react";
import { DataChartType } from "libs/types/lab1";

export interface IPlotLineProps extends DetailedHTMLProps<HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {
  data: DataChartType;
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
  WIDTH: number;
  HEIGHT: number;
  epsilonData: number[];
  srcPositionRelative: number;
}



