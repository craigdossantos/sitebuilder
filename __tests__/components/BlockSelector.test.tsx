import { render, screen, fireEvent } from '@testing-library/react';
import BlockSelector from '../../components/BlockSelector';
import { BlockType } from '../../components/types';
import '@testing-library/jest-dom';

describe('BlockSelector', () => {
  const mockOnSelect = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the block selector with all block type options', () => {
    render(<BlockSelector onSelect={mockOnSelect} onCancel={mockOnCancel} />);
    
    // Check if the title is displayed
    expect(screen.getByText('Select Block Type')).toBeInTheDocument();
    
    // Check if all block type options are displayed
    expect(screen.getByTestId('select-text-block')).toBeInTheDocument();
    expect(screen.getByTestId('select-image-block')).toBeInTheDocument();
    expect(screen.getByTestId('select-video-block')).toBeInTheDocument();
    
    // Check if the cancel button is displayed
    expect(screen.getByTestId('cancel-block-selection')).toBeInTheDocument();
  });

  it('calls onSelect with TEXT when text block is selected', () => {
    render(<BlockSelector onSelect={mockOnSelect} onCancel={mockOnCancel} />);
    
    // Click the text block option
    fireEvent.click(screen.getByTestId('select-text-block'));
    
    // Check if onSelect was called with the correct block type
    expect(mockOnSelect).toHaveBeenCalledWith(BlockType.TEXT);
  });

  it('calls onSelect with IMAGE when image block is selected', () => {
    render(<BlockSelector onSelect={mockOnSelect} onCancel={mockOnCancel} />);
    
    // Click the image block option
    fireEvent.click(screen.getByTestId('select-image-block'));
    
    // Check if onSelect was called with the correct block type
    expect(mockOnSelect).toHaveBeenCalledWith(BlockType.IMAGE);
  });

  it('calls onSelect with VIDEO when video block is selected', () => {
    render(<BlockSelector onSelect={mockOnSelect} onCancel={mockOnCancel} />);
    
    // Click the video block option
    fireEvent.click(screen.getByTestId('select-video-block'));
    
    // Check if onSelect was called with the correct block type
    expect(mockOnSelect).toHaveBeenCalledWith(BlockType.VIDEO);
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<BlockSelector onSelect={mockOnSelect} onCancel={mockOnCancel} />);
    
    // Click the cancel button
    fireEvent.click(screen.getByTestId('cancel-block-selection'));
    
    // Check if onCancel was called
    expect(mockOnCancel).toHaveBeenCalled();
  });
}); 