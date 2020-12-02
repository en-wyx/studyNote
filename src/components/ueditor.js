import React from 'react';
const UE = window.UE;

class Ueditor extends React.Component {

  static defaultProps = {
    config: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      editor: '',
    };
  }

  componentDidMount() {
    this.initEditor.call(this)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 典型用法（不要忘记比较 props）：
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: prevProps.value
      })
    }
  }

  componentWillUnmount() {
    // 组件卸载后，清除放入库的id
    UE.delEditor(this.props.id);
  }

  initEditor() {
    /*初始化编辑器*/
    const { id, config } = this.props;
    const ueEditor = UE.getEditor(this.props.id, config);

    ueEditor.ready((ueditor) => {
      if (!ueditor) {
        UE.delEditor(id);
        this.initEditor();
      }
      ueEditor.addListener('selectionchange', this.onChange.bind(this, ueEditor.selection.getText().id)); //加选择改变事件监听
    });
    let editor = ueEditor;
    this.setState({ editor });
  }
  onChange() {
    /*获取编辑器内容函数*/
    let { editor } = this.state;
    let value = editor.getContent();
    if (this.props.onChange) {
      // 该方法用于Form表单的getFieldDecorator获取自定义组件的值
      this.props.onChange(value);
    }
  }
  render() {
    let { value, id } = this.props;
    return (
      <div >
        <textarea id={id}
          value={value}
          onChange={this.onChange.bind(this)} />
      </div>
    )
  }
}
export default Ueditor;
