import React, { Component } from 'react';
import { getChildrenQty, getSortedTreeKeys } from '../common';
import ButtonContainer            from './button/index';
import ButtonSelfContainer        from './button/self/container';
import ButtonConnectors           from './button/self/connectors';
import ButtonBody                 from './button/self/body';
import ChildrenContainer          from './button/children/container';
import ChildrenSublingsConnectors from './button/children/connectors';
import TreeModal                  from './tree-modal';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.style = {
      content: {
        display: "flex",
        flexDirection: "column"
      },
      childrenSublings: {
        container: {
          display: "flex"
        },
        connectorsContainer: {
          position: "relative"
        },
        connectors: {
          position: "absolute",
          top: "0px",
          bottom: "0px",
          background: "darkorchid"
        }
      },
      connectors: {
        container: {
          display: "flex",
          position: "relative",
        },
        handle: {
          display: "flex",
          position: "absolute",
          top: "0px",
          right: "0px",
          border: "1px solid #aaa",
          borderRight: "none",
          boxShadow: "0 2px 2px -2px",
        },
        expandButton: {
          position: "absolute",
          borderRadius: "100%",
          outline: "none",
          cursor: "pointer",
          fontSize: "14px",
          fontFamily: "monospace",
          background: "white",
          zIndex: 999
        },
        parentTop: {
          position: "absolute",
          top: "0px",
          background: "red",
        },
        parentLeft: {
          position: "absolute",
          background: "green",
        },
        sublings: {
          position: "absolute",
          bottom: "0px",
          background: "goldenrod",
        },
        children: {
          position: "absolute",
          bottom: "0px",
          background: "blue",
        }
      },
      button: {
        container: {
          display: "flex",
          width: "600px",
        },
        body: {
          display: "flex",
          flex: 1,
          position: "relative",
          flexDirection: "column",
        },
        inner: {
          width: "100%",
          border: "1px solid #aaa",
          boxShadow: "2px 2px 2px -2px",
          fontFamily: "Roboto",
          fontSize: "16px",
          overflow: "hidden",
          padding: "5px"
        }
      },
    };
  }

  traverse() {
    const { data }  = this.props;
    const keys = getSortedTreeKeys(data);
    let topLevelNodeLengts = Object.keys(data).reduce( (result, key) => {
      return data[key].path.length === 1 ? result + 1 : result;
    }, 0);
    let k = 0;
    return keys.reduce((result, key, i) => {
      if (data[key].path.length !== 1) {
        return result; //if not a top level just return prev result to the next reduce call
      }
      k += 1;
      result.push(this.getBtnJSX({
        children: this.getBtnChildrenJSX(data[key]), //inside getBtnChildrenJSX chidlren of children will be calculated recursively,
        first: k === 1 ? true : false,
        hasNext: result.length + 1 === topLevelNodeLengts ? false : true, //if this is last top node then it has no next
        nodeData: data[key]
      }));
      return result;
    }, []);
  }

  getBtnChildrenJSX (btnObject) {
    const { data }  = this.props;
    const keys = getSortedTreeKeys(data);
    return keys.reduce((result, key) => {
      let current = data[key];
      //current.path without last cord = parent path && current.path level = parentLevel + 1
      if (current.path.slice(0, current.path.length - 1).toString() === btnObject.path.toString() && current.path.length === btnObject.path.length + 1) {
        const childJXS = this.getBtnJSX({
          children: this.getBtnChildrenJSX(data[key]),
          hasNext: getChildrenQty(btnObject.path, data) === result.length + 1 ? false : true,
          nodeData: data[key]
        });
        result.push(childJXS);
        return result;
      }
      return result;
    }, []);
  }

  getBtnJSX({ children = [], first = false, hasNext = false, nodeData } = {} ){
    const { data, boardId } = this.props;
    const style = this.style;
    return (
      <ButtonContainer style={style.content} key={nodeData.id} >
        <ButtonSelfContainer style={style.button.container} >
          <ButtonConnectors {...this.props} style={style.connectors} childrenLength={children.length} first={first} hasNext={hasNext} boardId={boardId} {...nodeData} />
          <ButtonBody style={style.button} {...nodeData} boardId={boardId} />
        </ButtonSelfContainer>
        {children.length > 0 && !data[nodeData.id].collapsed &&
          <ChildrenContainer style={style.childrenSublings.container} >
            <ChildrenSublingsConnectors style={style.childrenSublings} hasNext={hasNext} />
            <div style={{display: "flex", flexDirection: "column"}}>
              {children}
            </div>
          </ChildrenContainer>
        }
      </ButtonContainer>
    );
  }

  addPixels(val) {
    return val.toString() + "px";
  }

  prepareStyles() {
    const innerHeight   = 36;
    const margin        = 8;
    const expandBtnSize = 20;
    const lineWidth     = 1;
    const lineColor     = "#555";
    const px            = this.addPixels;
    this.style.button.inner.height                       = px(innerHeight);
    this.style.button.container.height                   = px(innerHeight + margin);
    this.style.childrenSublings.connectors.width         = px(lineWidth);
    this.style.childrenSublings.connectors.left          = px(innerHeight/2 - lineWidth/2);
    this.style.childrenSublings.connectorsContainer.flex = "0 0 " + px(innerHeight);
    this.style.connectors.children.top                   = px(innerHeight);
    this.style.connectors.children.left                  = px(innerHeight + innerHeight/2 - lineWidth/2);
    this.style.connectors.children.width                 = px(lineWidth);
    this.style.connectors.container.flex                 = "0 0 " + px(innerHeight*2); //don't grow, don't shrink, width = innerHeigth / 2
    this.style.connectors.handle.left                    = px(innerHeight);
    this.style.connectors.handle.height                  = px(innerHeight);
    this.style.connectors.parentTop.height               = px(innerHeight/2);
    this.style.connectors.parentTop.left                 = px(innerHeight/2 - lineWidth/2);
    this.style.connectors.parentTop.width                = px(lineWidth);
    this.style.connectors.parentLeft.top                 = px(innerHeight/2);
    this.style.connectors.parentLeft.height              = px(lineWidth);
    this.style.connectors.parentLeft.right               = px(innerHeight);
    this.style.connectors.parentLeft.left                = px(innerHeight/2 - lineWidth/2);
    this.style.connectors.sublings.top                   = px(innerHeight/2);
    this.style.connectors.sublings.left                  = px(innerHeight/2 - lineWidth/2);
    this.style.connectors.sublings.width                 = px(lineWidth);
    this.style.connectors.expandButton.top               = px(innerHeight/2 - expandBtnSize/2);
    this.style.connectors.expandButton.left              = px(innerHeight/2 - expandBtnSize/2 - lineWidth/2);
    this.style.connectors.expandButton.height            = px(expandBtnSize);
    this.style.connectors.expandButton.width             = px(expandBtnSize);
    this.style.connectors.expandButton.fontSize          = px(expandBtnSize - 8);
    this.style.connectors.children.background            = lineColor;
    this.style.connectors.parentTop.background           = lineColor;
    this.style.connectors.parentLeft.background          = lineColor;
    this.style.connectors.sublings.background            = lineColor;
    this.style.connectors.children.background            = lineColor;
    this.style.childrenSublings.connectors.background    = lineColor;
    this.style.connectors.expandButton.border            = px(lineWidth) + " solid " + lineColor;
    this.style.connectors.expandButton.color             = lineColor;
  }

  render() {
    this.prepareStyles();
    return (
      <div className="Tree" style={{padding: 10}}>
        {this.traverse()}
        <TreeModal { ...this.props } />
      </div>
    );
  }

}
