import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redname } from "./personalSlice";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import InputMask from "react-input-mask";

export const Test = () => {
 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const state = useSelector((state: any) => state.counter);


  const validationSchemaObject = yup.object().shape({
    phone: yup
      .string()
      .test("len", "Укажите телефон до конца", (val: any) => {
        const val_length_without_dashes = val && val.replace(/[^0-9]/g, "").length;
        return val_length_without_dashes === 11;
      })
      .required("Укажите номер телефона"),
    name: yup
      .string()
      .min(2, "Обязательное поле")
      .max(52)
      .nullable()
      .required("Обязательное поле")
      .matches(
        /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
        "Имя может содержать только латинские или кириллические буквы"
      )
      .test(
        "no-leading-space",
        "Имя не может начинаться с пробела",
        (value) => {
          return !value || (value.trim() !== "" && value.trim() === value);
        }
      ),
    surname: yup
      .string()
      .min(2, "Обязательное поле")
      .max(52)
      .nullable()
      .required("Обязательное поле")
      .matches(
        /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
        "Фамилия может содержать только латинские или кириллические буквы"
      )
      .test(
        "no-leading-space",
        "Фамилия не может начинаться с пробела",
        (value) => {
          return !value || (value.trim() !== "" && value.trim() === value);
        }
      ),
    sex: yup.string().nullable().required("Обязательное поле"),
  });


  const formik = useFormik({
    initialValues: {
      phone: state.phone || '',
      name: state.name || '',
      surname: state.surname || '',
      sex: state.sex || '',
    },
    validationSchema: validationSchemaObject,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      dispatch(redname(values));
      navigate("/address"); 
      setLoading(false);
    },
  });

  
  useEffect(() => {
    formik.setValues({
      phone: state.phone || '',
      name: state.name || '',
      surname: state.surname || '',
      sex: state.sex || '',
    });
  }, [state]);

  const isFormValid = formik.isValid && formik.dirty || state.phone!==""&&state.name!==""&&state.surname!==""&&state.sex!==""

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        bgcolor: "background.paper",
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              border: "1px solid grey",
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "white",
            }}
          >
            <Typography variant="h5" component="h1" gutterBottom>
              Форма
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <InputMask
                mask="+7 (999) 999-99-99"
                value={formik.values.phone}
                onChange={formik.handleChange}
                disabled={loading}
              >
                {() => (
                  <TextField
                    variant="filled"
                    id="phone"
                    name="phone"
                    label="Телефон для связи"
                    fullWidth
                    margin="normal"
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone ? formik.errors.phone as string : ""}
                  />
                )}
              </InputMask>

              <TextField
                variant="filled"
                id="name"
                name="name"
                label="Имя"
                fullWidth
                margin="normal"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name ? formik.errors.name as string : ""}
              />
              <TextField
                variant="filled"
                id="surname"
                name="surname"
                label="Фамилия"
                fullWidth
                margin="normal"
                value={formik.values.surname}
                onChange={formik.handleChange}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
                helperText={formik.touched.surname ? formik.errors.surname as string : ""}
              />

              <FormControl fullWidth margin="normal">
                <Select
                  labelId="sex-label"
                  id="sex"
                  name="sex"
                  value={formik.values.sex}
                  onChange={formik.handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Выберите пол</em>
                  </MenuItem>
                  <MenuItem value="male">Мужчина</MenuItem>
                  <MenuItem value="female">Женщина</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                  {formik.touched.sex ? formik.errors.sex as string : ""}
                </Typography>
              </FormControl>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button variant="contained" fullWidth onClick={() => navigate(-1)}>
                    Назад
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading || !isFormValid}
                  >
                    {loading ? <CircularProgress size={24} /> : "Далее"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
 