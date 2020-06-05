import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ImageResults extends Component {
  state = {
    open: false,
    currentImg: '',
    savedImages: []
  };

  handleOpen = async (img) => {
    this.setState({ ...this.state, savedImages: [...this.state.savedImages, img] });
    localStorage.setItem('state', JSON.stringify(this.state))
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let imageListContent;
    const { images } = this.props;
    let storage = localStorage.getItem('state')
    let imagesLink = JSON.parse(storage)

    if (images) {
      imageListContent = (
        <div>
          {images.map(img => (
            <Grid container
              title={img.tags}
              key={img.id}
              onClick={() => this.handleOpen(img.largeImageURL)}
              actionIcon={
                <IconButton>
                  <ZoomIn color="white" />
                </IconButton>
              }
            >
              <div style={{position: 'relative'}}>
                <img src={img.largeImageURL} alt="" style={{width: '200px', height: "200px"}}/>
                <button style={{
                position: 'absolute',
                width:'180px',
                top: '80%',
                left: "50%", transform: "translate(-50%, -50%)",
                backgroundColor: '#000',
                color: 'white',
                fontSize: "16px",
                padding: "12px 24px",
                border: "none",
                cursor:"pointer",
                borderRadius: "5px",
                borderCollapse: "black",
                msTransform: "translate(-50%, -50%)", 
                }}>{
                  imagesLink.savedImages.find(res => res === img.largeImageURL) ? 'Saved' : 'Save'
                }</button>
              </div>
              
            </Grid>
          ))}
        </div>
      );
    } else {
      imageListContent = null;
    }

    const actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ];

    return (
      <>
      <div>
        <Grid container spacing={3}>
        <Grid item xs={6}>
          {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
        </Dialog>
        </Grid>
        <Grid item xs={6}>
          <h3>Saved Images</h3>
          {
           imagesLink && Array.from(new Set(imagesLink.savedImages)).map((res, index) => (
             <p key={index}> <a href={res}>{res}</a> </p>
           ))
          }
        </Grid>
        </Grid>
      </div>
      </>
    );
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageResults;