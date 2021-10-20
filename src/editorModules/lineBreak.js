class lineBreak {
  render(){
    return document.createElement("hr")
  }

  save() {
    return "hr"
  }

  static get toolbox() {
    return {
      title: "Line Break",
      icon: "Br"
    };
  }

}

export default lineBreak;