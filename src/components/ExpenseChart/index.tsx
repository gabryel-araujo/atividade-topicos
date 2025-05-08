import { useContext, useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Card } from "../Card";
import { ViewContext } from "../../contexts/ViewContext";

export function ExpenseChart() {
  const { accountData } = useContext(ViewContext);

  useLayoutEffect(() => {
    const root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        innerRadius: am5.percent(50),
      })
    );

    const grouped = accountData.arrExpenses.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = 0;
      }
      acc[curr.category] += curr.value;
      return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(grouped).map(([category, total]) => ({
      label: category,
      value: total,
    }));

    // Define data
    const data = [...chartData];

    // Create series
    const series1 = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Despesas por categoria",
        categoryField: "label",
        valueField: "value",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{category}: R${value.formatCurrency(value)}",
        }),
      })
    );
    series1.data.setAll(data);
    series1.labels.template.set("forceHidden", true);
    series1.ticks.template.set("forceHidden", true);

    // Add legend
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
      <div id="chartdiv" style={{ width: "100%", height: "50rem" }}></div>
    </Card>
  );
}
