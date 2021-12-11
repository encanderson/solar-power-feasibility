import React from "react";
import { useLocation } from "react-router-dom";

// material-ui
import { Grid, Typography } from "@material-ui/core";

// project imports
import MainCard from "@src/components/cards/MainCard";
import { gridSpacing } from "@src/store/constant";
import CheckComponent from "./CheckComponent";
import ChartResult from "./ChartResult";

// ===========================|| ||=========================== //

const CardResults = () => {
  const location = useLocation();
  const [data, setData] = React.useState({});
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setData(location.state);
    setChart(location.state.energy);
    setLoading(false);
    setTitle("Geração Estimada - kWh/m²");
  }, [location, data]);

  const [title, setTitle] = React.useState("");
  const [chart, setChart] = React.useState([]);

  const [checkEnergy, setCheckEnergy] = React.useState(false);
  const [checkTemp, setCheckTemp] = React.useState(false);
  const [checkHSP, setCheckHSP] = React.useState(false);

  React.useEffect(() => {
    if (checkEnergy) {
      setChart(location.state.energy);
      setTitle("Geração Estimada - kWh/m²");
    }
    if (checkTemp) {
      setChart(location.state.temperature);
      setTitle("Temperatura - ºC");
    }
    if (checkHSP) {
      setChart(location.state.hsp);
      setTitle("Hora de Sol Pico - kWh/m2/dia");
    }
    // eslint-disable-next-line
  }, [checkEnergy, checkTemp, checkHSP]);

  const handleCheck = () => {
    if (checkEnergy) {
      setCheckHSP(false);
      setCheckTemp(false);
    } else if (checkHSP) {
      setCheckTemp(false);
      setCheckEnergy(false);
    } else if (checkTemp) {
      setCheckHSP(false);
      setCheckEnergy(false);
    }
  };
  return (
    <>
      <MainCard>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Características Locais</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1">
                          Cidade : &nbsp;
                          <Typography component="span" variant="body2">
                            {data?.city}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1">
                          Estado : &nbsp;
                          <Typography component="span" variant="body2">
                            {data?.state}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1">
                          Latitude : &nbsp;
                          <Typography component="span" variant="body2">
                            {data?.lat}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1">
                          Longitude : &nbsp;
                          <Typography component="span" variant="body2">
                            {data?.lon}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1">
                          Distribuidora : &nbsp;
                          <Typography component="span" variant="body2">
                            {data?.distributor}
                          </Typography>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Dados Energéticos</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Potência : &nbsp;
                      <Typography component="span" variant="body2">
                        {data?.power} kWp
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Produção Estimada (média) : &nbsp;
                      <Typography component="span" variant="body2">
                        {data?.average} kWh/mês
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Área Estimada : &nbsp;
                      <Typography component="span" variant="body2">
                        {data?.area} m²
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Consumo Médio : &nbsp;
                      <Typography component="span" variant="body2">
                        {data?.demand} kWh/m²
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Gráficos</Typography>
                  </Grid>
                  <CheckComponent
                    check={checkEnergy}
                    setCheck={setCheckEnergy}
                    title={"Produção de Energia"}
                    handleCheck={handleCheck}
                  />
                  <CheckComponent
                    check={checkTemp}
                    setCheck={setCheckTemp}
                    title={"Temperatura"}
                    handleCheck={handleCheck}
                  />
                  <CheckComponent
                    check={checkHSP}
                    setCheck={setCheckHSP}
                    title={"Hora de Sol Pico"}
                    handleCheck={handleCheck}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
      <div style={{ marginTop: 15 }}>
        <ChartResult isLoading={isLoading} data={chart} title={title} />
      </div>
    </>
  );
};

export default CardResults;
