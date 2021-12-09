import React from "react";

// material-ui
import { useTheme } from "@material-ui/core/styles";
import { Box, Container, Grid, Typography } from "@material-ui/core";

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
          mt: "40px",
          [theme.breakpoints.down("sm")]: {
            mt: { xs: "46px", sm: "12px" },
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
                  <Box
                    component="span"
                    sx={{ ml: 2, color: theme.palette.primary.main }}
                  >
                    Resultados
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
