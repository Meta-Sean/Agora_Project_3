import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addPost } from "../../actions/postActions";
import InputGroup from "../common/InputGroup";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      image: "",
      price: "",
      inventory: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      title: this.state.title,
      text: this.state.text,
      image: this.state.image,
      price: this.state.price,
      inventory: this.state.inventory,
      handle: user.handle,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: "", title: "", image: "", price: "", inventory: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            List an Item for Sale!
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  info="Add a title for your product"
                />
                <TextFieldGroup
                  placeholder="Item Image"
                  name="image"
                  value={this.state.image}
                  onChange={this.onChange}
                  error={errors.image}
                  info="Add an image URL for your product"
                />
                <TextFieldGroup
                  placeholder="Item Price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  error={errors.price}
                  info="How much are you charging for each item?(all prices in USD)"
                />
                <TextFieldGroup
                  placeholder="Inventory / Quantity"
                  name="inventory"
                  value={this.state.inventory}
                  onChange={this.onChange}
                  error={errors.inventory}
                  info="How many do you have for sell?"
                />
                <TextAreaFieldGroup
                  placeholder="Add a description of your item"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
