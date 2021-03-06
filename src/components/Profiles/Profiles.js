import React, { Component } from "react";
import Profile from "../Profile/Profile.js";
import "./Profiles.css";

import Api from "../../utils/Api.js";

class Profiles extends Component {
  state = {
    profiles: [],
    error: null,
    isLoaded: false
  };

  componentDidMount() {
    // this.getProfiles();
    Api.get("?results=10").then(
      result => {
        console.log(result.data.results);
        this.setState({
          isLoaded: true,
          profiles: result.data.results
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  render() {
    const { error, isLoaded, profiles } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="profileList">
          {profiles.map(profile => {
            return <Profile profile={profile} key={profile.name.first} />;
          })}
        </div>
      );
    }
  }
}

export default Profiles;
