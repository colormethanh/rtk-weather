import * as yup from 'yup';

export default function useReturnDataValidation() {
  const weatherSchema = yup.object({
    id: yup.string().required(),
    name: yup.string().required(), 
    latLon: yup.object().required(), 
    currentWeather: yup.object().required(), 
    fiveDayWeather: yup.array().required()
  });
  
  return weatherSchema
}