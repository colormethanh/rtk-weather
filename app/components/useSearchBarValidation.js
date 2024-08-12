import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


export default function useFormValidation() {
  const formSchema = yup
  .object({
    city: yup.string().required().min(3),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  return {register, handleSubmit, errors }
}
