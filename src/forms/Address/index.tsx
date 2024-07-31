import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { redaddress } from "./addressSlice";
import * as yup from "yup";
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
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";


interface JobOption {
  name: {
    name:string
  };
  slug: string;
  url: string;
}

const Form2 = () => {
  const [loading, setLoading] = useState(false);
  const [jobOptions, setJobOptions] = useState<JobOption[]>([]);
  const [jobs,setJobs]=useState([])
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const state = useSelector((state: any) => state.address);

 console.log(state)
  useEffect(() => {
    const fetchJobOptions = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json();

     
        const formattedData: JobOption[] = data.map((item: string) => ({
          name: item,
          slug: item,
          url: `https://dummyjson.com/products/category/${item}`
        }));

        setJobOptions(formattedData);
        console.log(formattedData)
        
      } catch (error) {
        console.error("Error fetching job options:", error);
        setError(true);
      }
    };

    fetchJobOptions();
  }, []);

  const validationSchemaObject = yup.object().shape({
    job: yup.string().required("Обязательно выбрать место работы"),
    address: yup.string().required("Обязательное поле"),
  });

  const formik = useFormik({
    initialValues: {
      job: "",
      address: "",
    },
    validationSchema: validationSchemaObject,
    onSubmit: (values, { resetForm }) => {
    
      setLoading(true);
     dispatch(redaddress(values))
      setLoading(false);
      navigate("/final")
    },
  });

  console.log(Object.entries(formik.errors))
  const isFormValid = Object.entries(Object.entries(formik.errors).length==0)

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
              Форма 2: Адрес и место работы
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="job-label">Место работы</InputLabel>
                <Select
                  labelId="job-label"
                  id="job"
                  name="job"
                  value={formik.values.job}
                  onChange={formik.handleChange}
                  displayEmpty
                  error={formik.touched.job && Boolean()}
                >
                 

                  {jobOptions.map((option) => (
                    <MenuItem key={option.slug} value={option.name.name}>
                      {option.name.name}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="caption" color="error">
                  {formik.touched.job && formik.errors.job}
                </Typography>
              </FormControl>

              <TextField
                variant="filled"
                id="address"
                name="address"
                label="Адрес проживания"
                fullWidth
                margin="normal"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate("/")}
                  >
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

export default Form2;
