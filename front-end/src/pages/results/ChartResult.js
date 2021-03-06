import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

// material-ui
import {
  Grid,
  Typography,
  useTheme,
  Button,
  Link,
  Box,
} from "@material-ui/core";

// third-party
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";

// project imports
import SkeletonTotalGrowthBarChart from "@src/components/cards/TotalGrowthBarChart";
import MainCard from "@src/components/cards/MainCard";
import { gridSpacing } from "@src/store/constant";

// chart data
import chartData from "./chartData";

// ===========================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||=========================== //

const CharResult = ({ isLoading, data, title }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;
  const grey500 = theme.palette.grey[400];

  React.useEffect(() => {
    const newChartData = {
      ...chartData.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
            ],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      grid: {
        borderColor: navType === "dark" ? darkLight + 20 : grey200,
      },
      tooltip: {
        theme: navType === "dark" ? "dark" : "light",
      },
      legend: {
        labels: {
          colors: grey500,
        },
      },
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, "updateOptions", newChartData);
    }
  }, [
    navType,
    primary200,
    primaryDark,
    secondaryMain,
    secondaryLight,
    primary,
    darkLight,
    grey200,
    isLoading,
    grey500,
  ]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">{title}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Typography
                  variant="h4"
                  component="div"
                  color="inherit"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    fontWeight: "400",
                    lineHeight: { xs: "24px", md: "32px" },
                  }}
                >
                  {" "}
                  Fonte:
                  <Box
                    component="span"
                    sx={{ ml: 1, color: theme.palette.primary.main }}
                  >
                    <Button
                      color="inherit"
                      component={Link}
                      href={"http://labren.ccst.inpe.br/"}
                      target="_blank"
                    >
                      Atlas Brasileiro de Energia Solar
                    </Button>
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart
                {...{
                  ...chartData,
                  series: [
                    {
                      name: "Produ????o",
                      data: data,
                    },
                  ],
                }}
              />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

CharResult.propTypes = {
  isLoading: PropTypes.bool,
};

export default CharResult;
