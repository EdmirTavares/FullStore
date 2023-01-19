
import './styles.css';
import {SearchOutlined } from '@ant-design/icons';

interface SearchBarProps{
  value: any
  changeInput: any
}

const SearchBar = ({ value, changeInput}:SearchBarProps) => (
  <div className='searchBar-wrap'>
    <SearchOutlined className='searchBar-icon' />
    <input
      type='text'
      placeholder='Pesquisar por produtos...'
      value={value}
      onChange={changeInput}
    />
  </div>
);

export default SearchBar;