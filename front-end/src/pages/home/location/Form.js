import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  OutlinedInput,
} from "@material-ui/core";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import useScriptRef from "@src/hooks/useScriptRef";
import MaskCExpDate from "@src/utils/Mask";

import {
  energySuppliers,
  states,
  disponibilidade,
  nearCities,
} from "@src/store/constant";
import { SNACKBAR_OPEN } from "@src/store/actions";
import { getCities } from "@src/api/getCities";
import { calcSystem } from "@src/api/sizing";
import { validateRequest } from "@src/utils/validate";

// style constant
const useStyles = makeStyles((theme) => ({
  formInput: {
    ...theme.typography.customInput,
  },
}));

//===============================|| JWT LOGIN ||===============================//

const LocalForm = (props, { ...others }) => {
  const classes = useStyles();
  const scriptedRef = useScriptRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const [form, setForm] = React.useState({
    city: "",
    demand: "",
    disponibilidade: "",
    distributor: "",
    state: "",
    zip: "",
    nearCitie: "",
  });

  const [cities, setCities] = React.useState([]);

  const handleSupplier = async (_, value) => {
    setForm({
      ...form,
      distributor: value?.value,
    });
  };

  const handleState = async (_, value) => {
    setForm({
      ...form,
      state: value?.value,
    });
    const data = await getCities(value?.value);
    setCities(data);
  };

  const handleCity = (_, value) => {
    setForm({
      ...form,
      city: value,
    });
  };

  const handleConnectionType = (_, value) => {
    setForm({
      ...form,
      disponibilidade: value?.value,
    });
  };

  const handleNearCity = (_, value) => {
    setForm({
      ...form,
      nearCitie: value?.value,
    });
  };

  const handleCalc = async (zip) => {
    const resp = validateRequest(form);
    if (resp) {
      const response = await calcSystem(form);
      if (response.status) {
        history.push({
          pathname: "/resultados",
          state: response.data,
        });
      } else {
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message: "Ocorreu uma falha no processamento.",
          variant: "alert",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          alertSeverity: "error",
          close: true,
        });
      }
    } else {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: "Preencha todos os dados.",
        variant: "alert",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        alertSeverity: "error",
        close: true,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        zipCode: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        zipCode: Yup.string().required("Preencha com um Cep válido!"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await handleCalc(values.zipCode);

          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl
            fullWidth
            error={Boolean(touched.zipCode && errors.zipCode)}
            className={classes.formInput}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-zipCode">Cep</InputLabel>
            <OutlinedInput
              id="outlined-adornment-cpf-register"
              fullWidth
              value={values.zipCode}
              onBlur={handleBlur}
              onChange={handleChange}
              name="zipCode"
              inputProps={{
                mask: [
                  /[0-9]/,
                  /[0-9]/,
                  ".",
                  /[0-9]/,
                  /[0-9]/,
                  /[0-9]/,
                  "-",
                  /[0-9]/,
                  /[0-9]/,
                  /[0-9]/,
                ],
              }}
              inputComponent={MaskCExpDate}
            />
            {touched.zipCode && errors.zipCode && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {" "}
                {errors.zipCode}{" "}
              </FormHelperText>
            )}
          </FormControl>
          <Grid item xs={12}>
            <Autocomplete
              autoSelect={true}
              fullWidth
              id="state"
              style={{ marginBottom: 8 }}
              options={states}
              getOptionLabel={(option) => option.label}
              getOptionSelected={(option, value) =>
                option.label === value.label
              }
              // value={provider.address.state || ""}
              onChange={handleState}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={"Estado"}
                  // placeholder={provider.address.state}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              autoSelect={true}
              fullWidth
              id="city"
              style={{ marginBottom: 8 }}
              options={cities}
              getOptionLabel={(option) => option}
              getOptionSelected={(option, value) => option === value}
              // value={provider.address.state || ""}
              onChange={handleCity}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={"Cidade"}
                  // placeholder={provider.address.state}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              autoSelect={true}
              fullWidth
              id="nearCity"
              style={{ marginBottom: 8 }}
              options={nearCities}
              getOptionLabel={(option) => option.label}
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
              // value={provider.address.state || ""}
              onChange={handleNearCity}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={"Cidade mais próxima"}
                  // placeholder={provider.address.state}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              autoSelect={true}
              fullWidth
              id="stateComnpany"
              style={{ marginBottom: 8 }}
              options={energySuppliers}
              getOptionLabel={(option) => option.value}
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
              // value={provider.address.state || ""}
              onChange={handleSupplier}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={"Distribuidora de Eletricidade"}
                  // placeholder={provider.address.state}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              autoSelect={true}
              fullWidth
              id="city"
              style={{ marginBottom: 8 }}
              options={disponibilidade}
              getOptionLabel={(option) => option.label}
              getOptionSelected={(option, value) =>
                option.label === value.label
              }
              onChange={handleConnectionType}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={"Tipo de Ligação"}
                  // placeholder={provider.address.state}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={"Consumo Médio de Eletricidade - kWh"}
              inputProps={{
                autoComplete: "new-password",
              }}
              onChange={(event) =>
                setForm({
                  ...form,
                  demand: event.target.value,
                })
              }
            />
          </Grid>
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Entrar
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LocalForm;
