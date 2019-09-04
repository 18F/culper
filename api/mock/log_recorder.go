package mock

import (
	"errors"
	"fmt"

	"github.com/18F/e-QIP-prototype/api"
)

// Log Recorder

// LogLine is a mock log line
type LogLine struct {
	Level   string
	Message string
	Fields  api.LogFields
}

// LogRecorder is a mock log recorder
type LogRecorder struct {
	LogService
	lines   []LogLine
	globals api.LogFields
}

// RecordLine records and returns a new LogLine with its level, message, and fields.
func (r *LogRecorder) RecordLine(level string, message string, fields api.LogFields) LogLine {
	newLine := LogLine{
		Level:   level,
		Message: message,
		Fields:  api.LogFields{},
	}

	for k, v := range r.globals {
		newLine.Fields[k] = v
	}

	for k, v := range fields {
		newLine.Fields[k] = v
	}

	r.lines = append(r.lines, newLine)

	return newLine
}

// Info records new LogLine as INFO level
func (r *LogRecorder) Info(message string, fields api.LogFields) {
	line := r.RecordLine("INFO", message, fields)
	r.LogService.Info(line.Message, line.Fields)
}

// AddField adds new fields to LogRecorder's globals field
func (r *LogRecorder) AddField(name string, value interface{}) {
	if r.globals == nil {
		r.globals = api.LogFields{}
	}
	r.globals[name] = value
}

// GetOnlyMatchingMessage returns singular LogLine that matches message or errors
func (r *LogRecorder) GetOnlyMatchingMessage(message string) (LogLine, error) {
	messages := r.MatchingMessages(message)
	if len(messages) != 1 {
		return LogLine{}, errors.New(fmt.Sprintf("Didn't find only one line for message: %s (%s) ", message, messages))
	}
	return messages[0], nil
}

// MatchingMessages compares message to LogLines to seek those LogLines that match on LogRecorder
func (r *LogRecorder) MatchingMessages(message string) []LogLine {
	matches := []LogLine{}
	for _, line := range r.lines {
		if line.Message == message {
			matches = append(matches, line)
		}
	}
	return matches
}
