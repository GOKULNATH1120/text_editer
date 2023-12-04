import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaUndo, FaRedo } from 'react-icons/fa';

const Index = () => {
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);

  const addToHistory = (state) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(state);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      applyState(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      applyState(history[historyIndex + 1]);
    }
  };

  const applyState = (state) => {
    setSelectedFont(state.selectedFont);
    setFontSize(state.fontSize);
    setFontColor(state.fontColor);
    setText(state.text);
  };

  const textInputRef = useRef(null);

  useEffect(() => {
    // Focus on the text input when the component mounts
    textInputRef.current.focus();
  }, []);

  const [selectedFont, setSelectedFont] = useState('Arial');
  const [fontSize, setFontSize] = useState('16px');
  const [fontColor, setFontColor] = useState('#000000');
  const [text, setText] = useState('');

  const handleFontChange = (e) => {
    const newFont = e.target.value;
    setSelectedFont(newFont);
    addToHistory({ selectedFont: newFont, fontSize, fontColor, text });
  };

  const handleSizeChange = (e) => {
    const newSize = e.target.value + 'px';
    setFontSize(newSize);
    addToHistory({ selectedFont, fontSize: newSize, fontColor, text });
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setFontColor(newColor);
    addToHistory({ selectedFont, fontSize, fontColor: newColor, text });
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    addToHistory({ selectedFont, fontSize, fontColor, text: newText });
  };

  const toggleAdditionalInput = () => {
    setShowAdditionalInput(!showAdditionalInput);
  };

  const [additionalText, setAdditionalText] = useState('');

  const handleAdditionalTextChange = (e) => {
    const newText = e.target.value;
    setAdditionalText(newText);
    addToHistory({ selectedFont, fontSize, fontColor, text, additionalText: newText });
  };

  return (
    <Container className='mt-3'>
<Row className="mb-3 row-container">
      <Col>
        <Form.Group controlId="undo" className="d-flex flex-column align-items-center form-group-container">
          <Form.Label className="mb-2">Undo</Form.Label>
          <FaUndo onClick={undo} disabled={historyIndex <= 0} className="icon" />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="redo" className="d-flex flex-column align-items-center form-group-container">
          <Form.Label className="mb-2 ">Redo</Form.Label>
          <FaRedo onClick={redo} disabled={historyIndex >= history.length - 1} className="icon" />
        </Form.Group>
      </Col>

      <Col>
        <Form.Group controlId="fontStyle" className="form-group-container">
          <Form.Label className="fw-bold">Font Style</Form.Label>
          <Form.Control as="select" onChange={handleFontChange} value={selectedFont}>
            <option>Arial</option>
            <option>Times New Roman</option>
            <option>Courier New</option>
            {/* Add more font options as needed */}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="fontSize" className="form-group-container">
          <Form.Label className="fw-bold">Font Size</Form.Label>
          <Form.Control type="number" min="1" onChange={handleSizeChange} value={parseInt(fontSize)} />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="fontColor" className="form-group-container">
          <Form.Label className="fw-bold">Font Color</Form.Label>
          <Form.Control type="color" onChange={handleColorChange} value={fontColor} />
        </Form.Group>
      </Col>
    </Row>


    <Row className="centered-row">
  <Col md={6} className="mb-5">
    <Row>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        style={{ fontFamily: selectedFont, fontSize, color: fontColor }}
        placeholder="Type here..."
        ref={textInputRef} // Attach the ref to the input
      />
    </Row>
    {showAdditionalInput && (
      <Row className='left-side'>
        <input
          type="text"
          value={additionalText}
          onChange={handleAdditionalTextChange}
          style={{ fontFamily: selectedFont, fontSize, color: fontColor, marginTop: '10px' }}
          placeholder="Additional Text..."
        />
      </Row>
    )}
    <Row className="left-side mt-5">
      <Button onClick={toggleAdditionalInput}>Add Text</Button>
    </Row>
  </Col>
</Row>

    </Container>
  );
};

export default Index;
