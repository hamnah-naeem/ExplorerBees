import { useState, useRef } from "react";
import {
  HiOutlinePhotograph,
  HiX,
  HiOutlineEmojiHappy,
} from "react-icons/hi";
import { FaPollH } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import EmojiPicker from "emoji-picker-react";

export default function PostBox({
  value,
  onChange,
  onPost,
  selectedImage,
  onImageUpload,
  removeImage,
  fileInputRef,
  avatar,
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPollForm, setShowPollForm] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const addEmoji = (emojiData) => {
    onChange(value + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      const newOptions = [...pollOptions];
      newOptions.splice(index, 1);
      setPollOptions(newOptions);
    }
  };

  const handlePollOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleSubmit = () => {
    const postData = {
      content: value,
      image: selectedImage,
      poll: showPollForm ? { 
        options: pollOptions.filter(opt => opt.trim() !== "")
      } : null
    };

    onPost(postData);
    setShowPollForm(false);
    setPollOptions(["", ""]);
  };

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex">
        <div className="mr-3">
          <img className="rounded-full w-12 h-12" src={avatar} alt="Avatar" />
        </div>
        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent text-black text-lg outline-none resize-none placeholder-gray-500"
            placeholder="Share your thoughts..."
            rows="3"
          />

          {showPollForm && (
            <div className="mt-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="mb-4">
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handlePollOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        onClick={() => removePollOption(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                {pollOptions.length < 4 && (
                  <button
                    onClick={addPollOption}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    + Add option
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowPollForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          )}

          {selectedImage && (
            <div className="relative mt-2 mb-2">
              <img
                src={selectedImage}
                alt="Preview"
                className="rounded-2xl max-h-80 w-full object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 left-2 bg-black bg-opacity-75 rounded-full p-2 hover:bg-opacity-100"
              >
                <HiX className="h-5 w-5 text-white" />
              </button>
            </div>
          )}

          {showEmojiPicker && (
            <div className="absolute z-10 top-full left-0 mt-2">
              <EmojiPicker 
                onEmojiClick={addEmoji} 
                width={300} 
                height={350}
                previewConfig={{ showPreview: false }}
                skinTonesDisabled
                searchDisabled
                suggestedEmojisMode={false}
              />
            </div>
          )}

          <div className="flex justify-between items-center mt-3">
            <div className="flex space-x-2 text-black">
              <Tooltip title="Click to upload image" placement="top" arrow>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <HiOutlinePhotograph className="h-5 w-5" />
                </button>
              </Tooltip>
              <input
                type="file"
                ref={fileInputRef}
                onChange={onImageUpload}
                accept="image/*"
                className="hidden"
              />

              <Tooltip title="Create poll" placement="top" arrow>
                <button
                  onClick={() => setShowPollForm(!showPollForm)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaPollH className="h-5 w-5" />
                </button>
              </Tooltip>

              <Tooltip title="Add emoji" placement="top" arrow>
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <HiOutlineEmojiHappy className="h-5 w-5" />
                </button>
              </Tooltip>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!value.trim() && !selectedImage && !(showPollForm && pollOptions.some(opt => opt.trim() !== ""))}
              className={`font-bold px-4 py-1.5 rounded-full text-sm ${
                !value.trim() && !selectedImage && !(showPollForm && pollOptions.some(opt => opt.trim() !== ""))
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black hover:bg-yellow-700 text-white"
              } transition-colors duration-200`}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}