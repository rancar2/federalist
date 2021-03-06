import React from 'react';

import { getSafeRepoName } from '../../../util';

const propTypes = {
  name: React.PropTypes.string.isRequired,
  defaultOwner: React.PropTypes.string.isRequired,
  example: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  thumb: React.PropTypes.string.isRequired,
  active: React.PropTypes.number.isRequired,
  handleChooseActive: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  index: React.PropTypes.number.isRequired,
};

class TemplateSite extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: props.defaultOwner,
      repository: '',
      template: props.name,
    };

    this.handleChooseActive = this.handleChooseActive.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getFormVisible() {
    const { active, index } = this.props;
    return active === index;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const repository = getSafeRepoName(this.state.repository);
    const site = Object.assign({}, this.state, { repository });

    this.props.handleSubmit(site);
  }

  handleChooseActive() {
    this.props.handleChooseActive(this.props.index);
  }

  render() {
    return (
      <div className="template-block">
        <div className="well">
          <div className="well-heading">
            <h3>{this.props.title}</h3>
          </div>
          <div className="well-text">
            <a data-action="name-site" className="thumbnail">
              <img
                src={this.props.thumb}
                alt={`Thumbnail screenshot for the ${this.props.title} template`}
              />
            </a>
            <p>{this.props.description}</p>
            <div className="button_wrapper">
              <a
                className="usa-button usa-button-outline"
                href={this.props.example}
                target="_blank"
                rel="noopener noreferrer"
                role="button"
              >
                Example
              </a>
              <button
                className="usa-button"
                onClick={this.handleChooseActive}
              >
                Use this template
              </button>
            </div>
            {this.getFormVisible() ?
              <form
                className="new-site-form"
                onSubmit={this.handleSubmit}
              >
                <label htmlFor="repository">What GitHub account will own your site?</label>
                <input
                  name="owner"
                  type="text"
                  value={this.state.owner}
                  onChange={this.handleChange}
                />
                <label htmlFor="repository">Name your new site</label>
                <input
                  name="repository"
                  type="text"
                  value={this.state.repository}
                  onChange={this.handleChange}
                />
                <input type="submit" value="Create site" />
              </form>
            : null}
          </div>
        </div>
      </div>
    );
  }
}

TemplateSite.propTypes = propTypes;

export default TemplateSite;
