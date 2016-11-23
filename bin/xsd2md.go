package main

import (
	"bufio"
	"encoding/xml"
	"fmt"
	"log"
	"os"
	"strings"
)

// Node is a generic SGML node with some identified attributes
// common in XML Schema Definitions.
type Node struct {
	XMLName    xml.Name
	Attributes []xml.Attr `xml:"-"`
	Content    []byte     `xml:",innerxml"`
	Nodes      []Node     `xml:",any"`
	Name       string     `xml:"name,attr,omitempty"`
	Type       string     `xml:"type,attr,omitempty"`
	MinOccurs  int        `xml:"minOccurs,attr,omitempty"`
	Base       string     `xml:"base,attr,omitempty"`
	Value      string     `xml:"value,attr,omitempty"`
}

// UnmarshalXML implements the interface necessary to assist in unmarshalling
// the XML element
func (n *Node) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {
	n.Attributes = start.Attr
	type node Node

	// Set any defaults here which do not coincide with Go defaults
	n.MinOccurs = 1

	return d.DecodeElement((*node)(n), &start)
}

func main() {
	for _, arg := range os.Args[1:] {
		f, err := os.Open(arg)
		if err != nil {
			log.Print(err)
			continue
		}

		r := bufio.NewReader(f)
		d := xml.NewDecoder(r)

		var start Node
		err = d.Decode(&start)
		if err != nil {
			log.Print(err)
			continue
		}

		walk(1, []Node{start}, transform)
	}
}

// walk through the given nodes applying a function to each to
// assist in flow control. The level is passed to each for additional
// formatting.
func walk(level int, nodes []Node, f func(int, Node) bool) {
	for _, n := range nodes {
		if f(level, n) {
			i := level
			for _, l := range []string{"element", "restriction", "attribute"} {
				if l == n.XMLName.Local {
					i++
					break
				}
			}

			walk(i, n.Nodes, f)
		}
	}
}

// transform takes a node and outputs any result back to
// standard output.
func transform(level int, n Node) bool {
	switch n.XMLName.Local {
	case "element":
		optional := "required"
		if n.MinOccurs == 0 {
			optional = "optional"
		}

		t := "element"
		if n.Type != "" {
			t = strings.Replace(n.Type, "xs:", "", 1)
		}

		fmt.Printf("%s %s (%s, %s)\n\n", strings.Repeat("#", level), n.Name, t, optional)
	case "restriction":
		// Go through the children
		fmt.Printf("  + Restrictions\n\n")
		for _, c := range n.Nodes {
			fmt.Printf("    - %s: %s\n", c.XMLName.Local, c.Value)
		}
		fmt.Printf("\n")
	case "attribute":
		optional := "required"
		if n.MinOccurs == 0 {
			optional = "optional"
		}

		fmt.Printf("  + Attribute %s (%s)\n\n", n.Name, optional)
	}
	return true
}

// NOTE: This is commented out because currently everything needed
// is mapped in the struct. However if more flexibility is necessary
// this can be useful.

// // getAttribute will find an attribute with a matching local name
// // and return the value. If no value is found an empty string
// // is returned instead.
// func getAttribute(key string, attributes []xml.Attr) string {
// 	for _, attr := range attributes {
// 		if attr.Name.Local == key {
// 			return attr.Value
// 		}
// 	}

// 	return ""
// }
