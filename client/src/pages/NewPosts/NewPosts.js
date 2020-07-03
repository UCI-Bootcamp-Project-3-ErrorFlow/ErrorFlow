import React from 'react';
import axios from 'axios';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import './textEditor.css';
import '../../../../node_modules/draft-js/dist/Draft.css';

class NewPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      title: '',
    };

    this.focus = () => this.refs.editor.focus();

    this.onChange = (editorState) => {
      const contentState = editorState.getCurrentContent();
      this.saveContent(contentState);
      this.setState({
        editorState,
      });
    };


    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  //for tag and title post info
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  saveContent = (content) => {
    window.localStorage.setItem('content', JSON.stringify(content));
  };

  handleSubmitBtn = (event) => {
    event.preventDefault();

    const content = window.localStorage.getItem('content');

      if (content) {
        let parsedContent = JSON.parse(content);
        let parsedBodyContent = '';
        for (const prop in parsedContent.blockMap) {
          console.log(parsedContent.blockMap[prop].text);
          parsedBodyContent += parsedContent.blockMap[prop].text + ' ';
        }

      let parsedTitle = this.state.title;

      axios
        .post(
          '/api/myposts',
          {
            title: parsedTitle,
            body: parsedBodyContent,
            isSolved: false,
            commentBody: [],
            commentAuthor: [],
            likeValue: 0,
            isLiked: false,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('user')}`,
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => console.error(err));
    } else {
      this.state.editorState = EditorState.createEmpty();
    }
    this.setState({
      title: '',
    });
  };

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;

    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <>
        <div className='RichEditor-root'>
          <form>
            <label name='title' title='title'></label>
            <input
              name='title'
              title='title'
              value={this.state.title}
              placeholder='Title'
              onChange={(event) => this.handleInputChange(event)}
            ></input>
            <hr></hr>
          </form>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder='Tell Us About Your Errors...'
              ref='editor'
              spellCheck={true}
            />
          </div>
        </div>
        <button onClick={this.handleSubmitBtn}>Submit</button>
      </>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className='RichEditor-controls'>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  {
    label: <img src='https://img.icons8.com/android/24/000000/bold.png' />,
    style: 'BOLD',
  },
  {
    label: <img src='https://img.icons8.com/officexs/16/000000/italy.png' />,
    style: 'ITALIC',
  },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className='RichEditor-controls'>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default NewPosts;
