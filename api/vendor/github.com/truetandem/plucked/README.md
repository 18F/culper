# plucked

`plucked` is a fork of [`goose`](https://bitbucket.org/liamstask/goose) which is a database
migration tool.

This fork was created for the purpose of:

 - [x] a focus on PostgresSQL
 - [x] removal of code or dependencies reliant on CGO

You can manage your database's evolution by creating incremental SQL or Go scripts.

# Installation

``` shell
$ go get -u github.com/truetandem/plucked
```

This will install the `plucked` binary to your `$GOPATH/bin` directory. You may also build
`plucked` into your own applications by importing `github.com/truetandem/plucked/migration`.
Documentation is available at [godoc.org](https://godoc.org/github.com/truetandem/plucked/migration).


# Contributors

Thank you!

* **Original Author**: Liam Staskawicz (liamstask)
* Josh Bleecher Snyder (josharian)
* Abigail Walthall (ghthor)
* Daniel Heath (danielrheath)
* Chris Baynes (chris_baynes)
* Michael Gerow (gerow)
* Vytautas Šaltenis (rtfb)
* James Cooper (coopernurse)
* Gyepi Sam (gyepisam)
* Matt Sherman (clipperhouse)
* runner_mei
* John Luebs (jkl1337)
* Luke Hutton (lukehutton)
* Kevin Gorjan (kevingorjan)
* Brendan Fosberry (Fozz)
* Nate Guerin (gusennan)
