import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, LinearProgress } from "@material-ui/core";
import ZapAppBar from "components/ZapAppBar";
import { makeStyles } from "@material-ui/core/styles";
import { getInvoices, getMonthlyStats } from "api";
import InvoicesTable, { InvoiceItem } from "components/InvoicesTable";
import ZapCardLayout from "components/ZapCardLayout";
import { Bar, Pie, Doughnut } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  title: {
    marginBottom: theme.spacing(2)
  }
}));

const chartData = {
  labels: [],
  datasets: [
    {
      label: "# of Expose",
      data: [],
      backgroundColor: []
    }
  ]
};

const chartOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  }
};

const chartBarColor = "rgba(255, 99, 132, 1)";

export default function Home(props) {
  const classes = useStyles();

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);

  const random_rgba = () => {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      r().toFixed(1) +
      ")"
    );
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const invoicesResponse = await getInvoices(83832, {
        from: "0119",
        to: "0321",
        top: 100
      });

      if (invoicesResponse.data?.code === 0) {
        const mappedInvoices = invoicesResponse.data?.data.map((item) => {
          return new InvoiceItem(
            item.create_date,
            item.printing_date,
            item.amount
          );
        });
        setInvoices(mappedInvoices);
      }

      const monthlyStatsResponse = await getMonthlyStats(83832, {
        from_date: "0320",
        to_date: "0221"
      });

      if (monthlyStatsResponse.data?.code === 0) {
        const exposeStats = monthlyStatsResponse.data?.data.filter(
          (item) => item.type === 2
        );

        exposeStats.forEach((item) => {
          chartData.labels.push(item.date);
          chartData.datasets[0].data.push(item.total_amount);
          chartData.datasets[0].backgroundColor.push(random_rgba());
        });

        chartRef.current.chartInstance.update({
          preservation: true
        });

        chartRef2.current.chartInstance.update({
            preservation: true
          });

        chartRef3.current.chartInstance.update({
            preservation: true
          });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInvoiceDownload = (invoiceItem) => {
    alert(invoiceItem.amount);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <ZapAppBar title="ZAP React Training" color="primary" />
      {loading && <LinearProgress variant="indeterminate" color="secondary" />}

      <Container disableGutters className={classes.root}>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <ZapCardLayout title="Charts">
              {/* Here the children is configured  */}
              <Bar
                data={chartData}
                options={chartOptions}
                ref={chartRef}
              />
            </ZapCardLayout>
          </Grid>
          <Grid item lg={6}>
            <ZapCardLayout title="Charts">
              {/* Here the children is configured  */}
              <Pie
                data={chartData}
                options={chartOptions}
                ref={chartRef2}
              />
            </ZapCardLayout>
          </Grid>
          <Grid item lg={6}>
            <ZapCardLayout title="Charts">
              {/* Here the children is configured  */}
              <Doughnut
                data={chartData}
                options={chartOptions}
                ref={chartRef3}
              />
            </ZapCardLayout>
          </Grid>                    
          <Grid item lg={6}>
            <ZapCardLayout title="Invoices">
              {/* Here the children is configured  */}
              <InvoicesTable
                invoices={invoices}
                onDownloadInvoiceClicked={handleInvoiceDownload}
              />
            </ZapCardLayout>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
