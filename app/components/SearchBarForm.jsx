import { useState } from "react";
import useSearchBarValidation from "./useSearchBarValidation";
import {v4 as uuidv4} from 'uuid';
import Error from "./ErrorMessage";

export default function SearchBarForm({handleFormSubmit, returnDataError = null}) {
  const [inputText, setInputText] = useState("");
  const {register, handleSubmit, errors} = useSearchBarValidation();
  
  const handleOnInputChange = (target) => setInputText(target.value);

  const onSubmit = () => {
    handleFormSubmit(inputText);
    setInputText("");
  };

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
        { errors.city && <Error message={errors.city.message} /> }
        { returnDataError && <Error key={uuidv4()} message={returnDataError.message} /> }
      </div>
    </form>
  )
}