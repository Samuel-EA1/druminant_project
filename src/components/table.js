import React, { useRef } from 'react';
import CSSMotionList from 'rc-animate/lib/CSSMotionList';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import Table from 'rc-table';
// import '../styles/tableanimation.less';
// import '../styles/animation.less';

const MotionBody = ({ children, ...props }) => {
  const nodeList = toArray(children);
  const nodesRef = useRef({});

  const keys = [];
  nodeList.forEach(node => {
    const { key } = node;
    nodesRef.current[key] = node;
    keys.push(key);
  });

  return (
    <tbody {...props}>
      <CSSMotionList keys={keys} component={false} motionName="move">
        {({ key, className }) => {
          const node = nodesRef.current[key];
          return React.cloneElement(node, {
            className: classNames(node.props.className, className),
          });
        }}
      </CSSMotionList>
    </tbody>
  );
};

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { a: 'AfricanGoat', b: 'EE1', c: 'male', d: '19/04/2024', key: '1' },
        { a: 'AfricanGoat', b: 'EE1', c: 'male', d: '19/04/2024', key: '2' },
        { a: 'AfricanGoat', b: 'EE1', c: 'male', d: '19/04/2024', key: '3' },
        { a: 'AfricanGoat', b: 'EE1', c: 'male', d: '19/04/2024', key: '4' },
      ],
    };
    this.columns = [
      { title: 'Breed', dataIndex: 'a', key: 'a', width: 200 },
      { title: 'Tag ID', dataIndex: 'b', key: 'b', width: 200 },
      { title: 'Sex', dataIndex: 'c', key: 'c', width: 200 },
      {title: 'Birth Date', dataIndex: 'd', key: 'd', width: 200 },
      {
        title: 'Actions',
        dataIndex: '',
        key: 'e',
        render: (record) => {
            console.log({record})
           return <button onClick={e => this.onDelete(record.key, e)}>
            Delete
          </button>
        }
          
      },
    ];
  }

  onDelete = (key, e) => {
    console.log('Delete', key);
    e.preventDefault();
    this.setState(({ data }) => ({
      data: data.filter(item => item.key !== key),
    }));
  };

//   onAdd = () => {
//     this.setState(({ data }) => ({
//       data: [
//         ...data,
//         {
//           a: 'new data',
//           b: 'new data',
//           c: 'new data',
//           key: Date.now(),
//         },
//       ],
//     }));
//   };

  render() {
    return (
      <div style={{ margin: 20, border: "2px solid yellow" }}>
       
        <Table
          columns={this.columns}
          data={this.state.data}
          components={{
            body: { wrapper: MotionBody },
          }}
        />
      </div>
    );
  }
}

export default Demo;
