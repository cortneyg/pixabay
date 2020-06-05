import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Select from '@material-ui/core/Select';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';

class Search extends Component {
  state = {
    searchText: '',
    amount: 10,
    apiUrl: 'https://pixabay.com/api',
    apiKey: '16714265-24d4e1ff365d52099e14a79c2',
    images: [],
    category: ''
  };

  onTextChange = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === '') {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
              this.state.searchText
            }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      }
    });
  };

  onCategoryChange = e => {
    this.setState({...this.state, category: e.target.value})
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
              this.state.searchText
            }&image_type=photo&per_page=${this.state.amount}&category=${this.state.category}&safesearch=true`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
  };

  onAmountChange = (e, index, value) => this.setState({ amount: value });

  render() {
    console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search For Images"
          fullWidth={true}
        />
        <br />

          <Select
          native
          onChange={this.onCategoryChange}
        >

          <option aria-label="None" value="" />
          <option value={'fashion'}>Fashion</option>
          <option value={'nature'}>Nature</option>
          <option value={'backgrounds'}>Backgrounds</option>
          <option value={'science'}>Science</option>
          <option value={'feelings'}>Feelings</option>
          <option value={'religion'}>Religion</option>
          <option value={'health'}>Health</option>
          <option value={'places'}>Places</option>
          <option value={'animals'}>Animals</option>
          <option value={'industry'}>Industry</option>
          <option value={'food'}>Food</option>
          <option value={'sports'}>Sports</option>
          <option value={'transportation'}>Transportation</option>
          <option value={'travel'}>Travel</option>
          <option value={'buildings'}>Buildings</option>
          <option value={'business'}>Business</option>
          <option value={'music'}>Music</option>
          <option value={'computer'}>Computer</option>
        </Select>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;