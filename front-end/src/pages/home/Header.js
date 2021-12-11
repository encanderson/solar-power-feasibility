import React from "react";
// import { Link } from "react-router-dom";

// material-ui
import { useTheme } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Button,
} from "@material-ui/core";

// third party
import { motion } from "framer-motion";

// project imports
import { gridSpacing } from "@src/store/constant";

const HeaderPage = (divRef) => {
  const theme = useTheme();

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={gridSpacing}
        textAlign="center"
        sx={{
          mt: "100px",
          [theme.breakpoints.down("sm")]: {
            mt: { xs: "116px", sm: "32px" },
          },
        }}
      >
        <Grid item xs={12} md={12}>
          <Grid
            container
            spacing={gridSpacing}
            sx={{
              pr: "80px",
              [theme.breakpoints.down("md")]: {
                pr: "0px",
                textAlign: "center",
              },
            }}
          >
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 30,
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "36px", sm: "48px", md: "64px" },
                    fontWeight: "900",
                    lineHeight: { xs: "42px", sm: "56px", md: "80px" },
                  }}
                >
                  Bem vindo à
                  <Box
                    component="span"
                    sx={{ ml: 2, color: theme.palette.primary.main }}
                  >
                    Calculadora Solar
                  </Box>
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2,
                }}
              >
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
                  Uma calculdora para contribuir no processo de análise para a
                  tomada de decisão de investimento em um sistema de geração de
                  eletricidade, nomeadamente para os sistemas fotovoltaicos. Os
                  códigos do Front-End e do Back-End podem ser encontrados no
                  repositório do
                  <Box
                    component="span"
                    sx={{ ml: 1, color: theme.palette.primary.main }}
                  >
                    <Button
                      color="inherit"
                      component={Link}
                      href={
                        "https://github.com/encanderson/solar-power-feasibility"
                      }
                      target="_blank"
                    >
                      GitHub
                    </Button>
                  </Box>
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderPage;
