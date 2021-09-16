import React from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import { useTheme } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Container,
  Grid,
  // Link,
  Typography,
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
          mb: "80px",
          [theme.breakpoints.down("sm")]: {
            mt: { xs: "116px", sm: "32px" },
            mb: "20px",
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
                  Queremos fazer parte da sua transição digital, trazendo
                  soluções alinhadas ao desenvolvimento sustentável, sabendo que
                  em nossas vidas
                  <Box
                    component="span"
                    sx={{ ml: 1, color: theme.palette.primary.main }}
                  >
                    Tudo se Conecta.
                  </Box>
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} sx={{ my: 3.25 }}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4,
                }}
              >
                <Grid
                  container
                  spacing={2}
                  sx={{ justifyContent: { xs: "center", md: "center" } }}
                >
                  <Grid item>
                    <Button
                      component={RouterLink}
                      to="/contato"
                      type="button"
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      Contato
                    </Button>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderPage;
