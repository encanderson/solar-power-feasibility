import React from "react";
import { useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux";

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

import { getAddress } from "@src/api/getAddress";
import { energySuppliers } from "@src/store/constant";
import { getTariff } from "@src/api/getTariff";

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

  const [energySupplier, setEnergySupplier] = React.useState("");

  const handleSupplier = async (_, value) => {
    setEnergySupplier(value?.value);
  };

  const handleLocation = async (values) => {
    let code = values.zipCode.replace(".", "").replace("-", "");
    const response = await getAddress(code);
    if (response) {
      console.log(response);
      console.log(energySupplier);
      const resp = await getTariff(energySuppliers, "2020");
      if (resp) {
        console.log(resp);
      }
    }
    history.push("/calculo-de-viabilidade");
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
          await handleLocation(values);

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
          {/* <FormControl
            fullWidth
            error={Boolean(touched.energySuppliers && errors.energySuppliers)}
            className={classes.formInput}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-energySuppliers">
              Distribuidora ou Forncedora de Eletricidade
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-cpf-register"
              fullWidth
              value={values.energySuppliers}
              onBlur={handleBlur}
              onChange={handleChange}
              name="energySuppliers"
            />
            {touched.energySuppliers && errors.energySuppliers && (
              <FormHelperText error id="standard-weight-helper-text--energy">
                {" "}
                {errors.energySuppliers}{" "}
              </FormHelperText>
            )}
          </FormControl>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )} */}
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
