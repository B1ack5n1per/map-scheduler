// Variable Declarations
let basement = [];
let floor1 = [];
let floor2 = [];

populateBasement();
populateFloor1();
populateFloor2();
console.log(basement);

let levels = [basement, floor1, floor2];

// Fill Floors
function populateBasement() {
  let p4 = new MapNode('p4');
  let s1 = new MapNode('s1');
  let i1 = new MapNode('i1');
  let w1 = new MapNode('w1');
  let i2 = new MapNode('i2');
  let p2 = new MapNode('p2');
  let i3 = new MapNode('i3');
  let e1 = new MapNode('e1');
  let a1 = new MapNode('a1');
  let s2 = new MapNode('s2');
  let p5 = new MapNode('p5');
  let p6 = new MapNode('p6');
  let p7 = new MapNode('p7');
  let p8 = new MapNode('p8');
  p4.link([
    {node: s1, dir: 'east'}
  ]);
  s1.link([
    { node: i1, dir: 'south' },
    { node: p4, dir: 'west' }
  ]);
  i1.link([
    { node: s1, dir: 'north' },
    { node: w1, dir: 'east' },
    { node: i2, dir: 'south' }
  ]);
  w1.link([
    { node: i1, dir: 'west' }
  ]);
  i2.link([
    { node: i1, dir: 'north' },
    { node: i3, dir: 'south' },
    { node: p2, dir: 'west' }
  ]);
  p2.link([
    { node: i2, dir: 'east' }
  ]);
  i3.link([
    { node: i2, dir: 'north' },
    { node: p5, dir: 'east' },
    { node: s2, dir: 'south' },
    { node: e1, dir: 'west' }
  ]);
  e1.link([
    { node: i3, dir: 'east' },
    { node: a1, dir: 'south' }
  ]);
  a1.link([
    { node: e1, dir: 'north' }
  ]);
  s2.link([
    { node: i3, dir: 'north' }
  ]);
  p5.link([
    { node: p6, dir: 'east' },
    { node: i3, dir: 'west' }
  ]);
  p6.link([
    { node: p7, dir: 'east' },
    { node: p5, dir: 'west' }
  ]);
  p7.link([
    { node: p8, dir: 'east' },
    { node: p6, dir: 'west' }
  ]);
  p8.link([
    { node: p7, dir: 'west' }
  ]);
  basement.push(p4);
  basement.push(s1);
  basement.push(i1);
  basement.push(w1);
  basement.push(i2);
  basement.push(p2);
  basement.push(i3);
  basement.push(e1);
  basement.push(a1);
  basement.push(s2);
  basement.push(p5);
  basement.push(p6);
  basement.push(p7);
  basement.push(p8);
}
function populateFloor1() {};
function populateFloor2() {};

// Function Declarations
function MapNode(val) {
  this.val = val;
  this.paths = [];

  this.link = (nodes) => {
    for (i = 0; i < nodes.length; i++) {
      this.paths.push(nodes[i]);
    }
  }
};
function navigate(firstNode, node, target, usedNodes, directions, fails) {
  usedNodes.push(node.val);
  for (i = 0; i < node.paths.length; i++) {
    let newVal = true;
    for (j = 0; j < usedNodes.length; j++) {
      if (node.paths[i].node.val === usedNodes[j]) {
        newVal = false;
      };
    }
    if (newVal) {
      if (node.paths[i].node.val === target) {
        directions.push(node.paths[i].dir);
        return directions;
      } else {
       directions.push(node.paths[i].dir);
       return navigate(firstNode, node.paths[i].node, target, usedNodes, directions, fails);
      }
    }
  }
  fails.push(node.val);
  return navigate(firstNode, firstNode, target, fails, [], fails);
};
/*function createPath(dirSet) {
  let hash = {
    north: 1,
    east: 2,
    south: 3,
    west: 4,
  }
  let prevDir = 1;
  let readableSet = [];
  for (i = 0; i < dirSet.length; i++) {
    dirSet[i] = hash[dirSet[i]];
    let check = (prevDir - dirSet[i]) % 4;
    if (check < 0) {
      check = 4 + check;
    }
    console.log(check);
    switch (check) {
      case 0:
        readableSet.push('Forward');
        break;
      case 1:
        readableSet.push('Left');
        break;
      case 2:
        readableSet.push('Backward');
        break;
      case 3:
        readableSet.push('Right');
    }
    prevDir = dirSet[i];
  }
  return readableSet;
}*/

// Jquery Events
$('#levels > li').on('click', (event) => {
  $('#levels > li').removeClass('active');
  $(event.currentTarget).toggleClass('active');
  $('#imageContainer > img').attr('src', event.currentTarget.dataset.src);
});

$('#container > h3').on('click', () => {
  let location = prompt('Where are you?');
  let destination = prompt('Where are you going?');
  for (i = 0; i < levels[0].length; i++) {
    if (location === levels[0][i].val) {
      location = levels[0][i];
    }
  }
  alert(navigate(location, location, destination, [], [], []));
});
