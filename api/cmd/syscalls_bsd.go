// +build darwin freebsd netbsd openbsd solaris dragonfly

package cmd

import "syscall"

const ioctlReadTermios = syscall.TIOCGETA
const ioctlWriteTermios = syscall.TIOCSETA
