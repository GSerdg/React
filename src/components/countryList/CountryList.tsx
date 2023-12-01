import { countryesArray } from '../../shared/autocomplite';

/* interface CountryListProps {
  input: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}

export default function CountryList(props: CountryListProps) {
  const filterCountryes = countryesArray.filter((item) =>
    item.match(new RegExp(`^${props.input}.*`, 'i'))
  );

  const list = filterCountryes.map((item) => {
    const key = countryesKeys[item];

    return (
      <li key={key} id={`country-${key}`} className="list__item">
        {item}
      </li>
    );
  });

  function handleClick(event: React.FormEvent<HTMLUListElement>) {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'LI') return;

    const value = target.innerText;
    props.setCountry(value);
  }

  return (
    <div className="country">
      <ul className="country_list" onClick={handleClick}>
        {list}
      </ul>
    </div>
  );
} */

export default function CountryList() {
  const optionList = countryesArray.map((item, index) => (
    <option value={item} key={index} />
  ));
  return <datalist id="countryList">{optionList}</datalist>;
}
