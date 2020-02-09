
const getBorderXobj = (numRows, numCols) => {

  return [
    { y: 0, startX: 0, endX: numCols },

    { y: 1, startX: 1, endX: 3 },
    { y: 3, startX: 1, endX: 3 },

    { y: 1, startX: 4, endX: 7 },
    { y: 3, startX: 4, endX: 7 },

    { y: 1, startX: 10, endX: 13 },
    { y: 3, startX: 10, endX: 13 },

    { y: 4, startX: 12, endX: 13 },
    { y: 9, startX: 12, endX: 13 },

    { y: 6, startX: 10, endX: 12 },
    { y: 7, startX: 10, endX: 12 },

    { y: 7, startX: 0, endX: 3 },
    { y: 9, startX: 0, endX: 3 },

    { y: 10, startX: 0, endX: 3 },
    { y: 12, startX: 0, endX: 3 },

    { y: 13, startX: 1, endX: 3 },
    { y: 15, startX: 1, endX: 3 },
    { y: 16, startX: 1, endX: 3 },
    { y: 18, startX: 1, endX: 3 },


    { y: 16, startX: 4, endX: 7 },
    { y: 18, startX: 4, endX: 7 },

    { y: 16, startX: 14, endX: 16 },
    { y: 18, startX: 14, endX: 16 },

    { y: 15, startX: 6, endX: 11 },
    { y: 14, startX: 6, endX: 8 },
    { y: 14, startX: 9, endX: 11 },

    { y: 12, startX: 8, endX: 9 },

    { y: 3, startX: 8, endX: 9 },


    { y: 4, startX: 1, endX: 3 },
    { y: 6, startX: 1, endX: 3 },

    { y: 4, startX: 4, endX: 5 },
    { y: 9, startX: 4, endX: 5 },

    { y: 6, startX: 5, endX: 7 },
    { y: 7, startX: 5, endX: 7 },

    { y: 4, startX: 6, endX: 11 },
    { y: 5, startX: 6, endX: 8 },
    { y: 5, startX: 9, endX: 11 },

    { y: 7, startX: 8, endX: 9 },

    { y: 4, startX: 15, endX: 16 },

    { y: 7, startX: 14, endX: 18 },
    { y: 9, startX: 14, endX: 18 },

    { y: 10, startX: 14, endX: 18 },
    { y: 12, startX: 14, endX: 18 },


    { y: 1, startX: 14, endX: 16 },
    { y: 3, startX: 14, endX: 16 },

    { y: 4, startX: 14, endX: 16 },
    { y: 6, startX: 14, endX: 16 },


    { y: 8, startX: 6, endX: 11 },
    { y: 11, startX: 6, endX: 11 },


    { y: 10, startX: 4, endX: 5 },
    { y: 15, startX: 4, endX: 5 },

    { y: 12, startX: 5, endX: 7 },
    { y: 13, startX: 5, endX: 7 },

    { y: 13, startX: 14, endX: 16 },
    { y: 15, startX: 14, endX: 16 },

    { y: 16, startX: 10, endX: 13 },
    { y: 18, startX: 10, endX: 13 },

    { y: 10, startX: 12, endX: 13 },
    { y: 15, startX: 12, endX: 13 },

    { y: 12, startX: 10, endX: 12 },
    { y: 13, startX: 10, endX: 12 },

    { y: 16, startX: 8, endX: 9 },

    { y: numRows, startX: 0, endX: numCols },
  ];
}

export default getBorderXobj;
