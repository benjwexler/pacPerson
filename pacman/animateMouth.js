
 const animateMouth = (change) => {
    return setInterval(function () {
      if (!d3.select("input[value=\"oranges\"]")[0][0].checked) {
        return d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
      }
      return d3.select("input[value=\"apples\"]").property("checked", true).each(change);
    }, 195);

  }

  export default animateMouth;