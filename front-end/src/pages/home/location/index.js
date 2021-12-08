import React from "react";

import { useTheme } from "@material-ui/core";
import { Grid, Stack, Typography, useMediaQuery } from "@material-ui/core";

import Wrapper1 from "@src/pages/home/cardsWrappers/Wrapper1";
import CardWrapper from "@src/pages/home/cardsWrappers/CardWrapper";
import LocalForm from "./Form";

const LocalInformation = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Wrapper1>
      <Grid
        container
        justifyContent={matchDownSM ? "center" : "space-between"}
        alignItems="center"
      >
        <Grid item xs={12} sx={{ minHeight: "105vh", height: "100%" }}>
          <Grid
            sx={{
              minHeight: "100vh",
              height: "100%",
              p: matchDownSM ? 0 : "0 80px",
            }}
            container
            direction="column"
            alignItems={matchDownSM ? "center" : "flex-start"}
            spacing={matchDownSM ? 25 : 46}
            justifyContent="center"
          >
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
            >
              <CardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                      >
                        <Typography
                          variant="caption"
                          fontSize="16px"
                          textAlign={matchDownSM ? "center" : ""}
                        >
                          Informe o seu CEP e Distribuidora de Eletricidade
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <LocalForm />
                  </Grid>
                </Grid>
              </CardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper1>
  );
};

export default LocalInformation;
