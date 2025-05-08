import { useContext, useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Card } from "../Card";
import { ViewContext } from "../../contexts/ViewContext";

type dataProps = {
  vategory: string;
  value: number;
  fill: am5.Color;
};

export function BarChart() {
  const { accountData } = useContext(ViewContext);

  useLayoutEffect(() => {
    const root = am5.Root.new("barchartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(am5xy.XYChart.new(root, {}));

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "category",
      })
    );

    const data = [
      {
        category: "Receitas",
        value: accountData.receipts,
        fill: am5.color(0x32a852),
      },
      {
        category: "Despesas",
        value: accountData.expenses,
        fill: am5.color(0xa83232),
      },
    ];

    xAxis.data.setAll(data);

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Tipo",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
      })
    );

    series.data.setAll(data);
    series.columns.template.adapters.add("fill", (fill, target) => {
      const context = target.dataItem?.dataContext as dataProps;
      return context?.fill ?? fill;
    });

    const legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);
    legend.labels.template.setAll({
      fontSize: 16,
      fontWeight: "800",
    });

    return () => {
      root.dispose();
    };
  }, [accountData]);

  return (
    <Card>
      <div id="barchartdiv" style={{ width: "100%", height: "30rem" }}></div>
    </Card>
  );
}
