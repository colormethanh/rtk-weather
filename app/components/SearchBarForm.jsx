import Error from "./ErrorMessage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {v4 as uuidv4} from 'uuid';


export default function SearchBarForm({handleFormSubmit, apiErrors = []}) {
  const [inputText, setInputText] = useState("");
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
  
  const handleOnInputChange = (target) => setInputText(target.value);

  const onSubmit = () => {
    handleFormSubmit(inputText);
    setInputText("")
  }
  return (
    <form id="search-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 d-flex flex-column">
        <div className="d-flex">
          <input
            {...register('city', {required: true})}
            type="text"
            id="search-input"
            className={`form-control me-3 ${errors.city && "is-invalid"}`}
            placeholder="Search a city"
            value={inputText}
            onChange={({target}) => handleOnInputChange(target)}
            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
        {errors.city && 
          <Error message={errors.city.message} />      
        }
        {apiErrors.map((error) => {
          return error.message && <Error key={uuidv4()} message={error.message} />
        })}
      </div>
    </form>
  )
}