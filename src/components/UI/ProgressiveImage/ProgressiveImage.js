import React, {Component} from 'react';
import classes from '../ProgressiveImage/ProgressiveImage.module.css'

class ProgressiveImage extends Component {
    state = {
      currentImage: this.props.preview,
      loading: true
    }
    

    imgError(image) {
      image.onerror = "";
      image.src = "/images/noimage.gif";
      return true;
    }
  

    componentDidMount() {
      this.fetchImage(this.props.image)
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.image !== this.props.image) {
        this.setState({ currentImage: nextProps.preview, loading: true }, () => {
          this.fetchImage(nextProps.image)
        })
      }
    }
  
    componentWillUnmount() {
      if (this.loadingImage) {
        this.loadingImage.onload = null
      }
    }
  
    fetchImage = src => {
      const image = new Image()
      image.onload = () => this.setState({ currentImage: this.loadingImage.src, loading: false })
      image.src = src
      this.loadingImage = image
    }
  
    style = loading => {
      return {
        transition: '0.5s filter linear',
        filter: `${loading ? 'blur(50px)' : ''}`,
      }
    }
    
    render() {
      const { currentImage, loading} = this.state
      const { alt } = this.props.alt

      return <img className={classes.Img} style={this.style(loading)} src={currentImage} alt={alt} />
     
    }


  }

export default ProgressiveImage