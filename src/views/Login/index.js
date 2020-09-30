import React from 'react'

const { $http } = React

class Login extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount(){
    this.handleGetChart();
  }
  handleGetChart = () => {
    $http.post('login', { username:'aliang',password: 13125175275 }).then((res) => {
      
    })

    $http.get('visit/chart').then(res => {
      console.log(res);
    }).catch(() => {
      
    })
  }

  render() {
    return (
      <div>
        login
      </div>
    )
  }
}

export default Login