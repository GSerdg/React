import { useSelector } from '../../shared/useSelector';

export default function CountryOptions() {
  const countriesArray = useSelector((state) => state.countries.countries);

  const optionList = countriesArray.map((item, index) => (
    <option value={item} key={index} />
  ));
  return <datalist id="countryList">{optionList}</datalist>;
}
