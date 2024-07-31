import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Slider, 
  Modal,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";


const validationSchemaObject = yup.object().shape({
  loanAmount: yup
    .number()
    .min(200, "Минимальная сумма займа $200")
    .max(1000, "Максимальная сумма займа $1000")
    .required("Обязательно выбрать сумму займа"),
  loanTerm: yup
    .number()
    .min(10, "Минимальный срок займа 10 дней")
    .max(30, "Максимальный срок займа 30 дней")
    .required("Обязательно выбрать срок займа"),
});

const Form3 = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: {
      loanAmount: 200,
      loanTerm: 10,
    },
    validationSchema: validationSchemaObject,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        await fetch("https://dummyjson.com/products/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: `${values.loanAmount} $ на ${values.loanTerm} дней`,
          }),
        });

        setModalContent(
          `Поздравляем, вам одобрен ${values.loanAmount} $ на ${values.loanTerm} дней.`
        );
        setOpenModal(true);
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCloseModal = () => setOpenModal(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

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
              Форма 3: Параметры займа
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <FormControl fullWidth margin="normal">
                <Typography gutterBottom>Сумма займа</Typography>
                <Slider
                  value={formik.values.loanAmount}
                  onChange={(event, newValue) =>
                    formik.setFieldValue("loanAmount", newValue)
                  }
                  min={200}
                  max={1000}
                  step={100}
                  marks
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `$${value}`}
                />
                <Typography align="center">
                  {`$${formik.values.loanAmount}`}
                </Typography>
                {formik.errors.loanAmount && formik.touched.loanAmount && (
                  <Typography variant="caption" color="error">
                    {formik.errors.loanAmount}
                  </Typography>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal">
                <Typography gutterBottom>Срок займа</Typography>
                <Slider
                  value={formik.values.loanTerm}
                  onChange={(event, newValue) =>
                    formik.setFieldValue("loanTerm", newValue)
                  }
                  min={10}
                  max={30}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value} дн.`}
                />
                <Typography align="center">
                  {`${formik.values.loanTerm} дн.`}
                </Typography>
                {formik.errors.loanTerm && formik.touched.loanTerm && (
                  <Typography variant="caption" color="error">
                    {formik.errors.loanTerm}
                  </Typography>
                )}
              </FormControl>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : "Подать заявку"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Поздравляем!
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {modalContent}
          </Typography>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            ОК
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Ошибка при отправке данных. Пожалуйста, попробуйте снова.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Form3;
