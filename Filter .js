var datas = {
  tree: [{
    name: 'name1',
    tree: [{
        name: 'name2'
      },
      {
        name: 'name3'
      },
      {
        name: 'name4',
        tree: [{
            name: 'name5'
          },
          {
            name: 'name6'
          }
        ]
      },
      {
        name: 'name7'
      }
    ]
  }, {
    name: 'name8',
    tree: [{
      name: 'name9'
    }]
  }]
};

function find({
  tree = [],
  ...object
}, name) {
  var result;
  if (object.name === name) return object;
  return tree.some(o => result = find(o, name)) && Object.assign({}, object, {
    tree: [result]
  });
}

console.log(find(datas, 'name5'));
