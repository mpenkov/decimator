"""Generate QUnit tests from flat text files.
Each line must be a Japanese number and a decimal number separated by a space.
No blank lines or comments are supported.
Prints JavaScript to standard output."""

import sys
import codecs
import os.path as P

if __name__ == "__main__":
    for fpath in sys.argv[1:]:
        _, fname = P.split(fpath)
        stem, ext = P.splitext(fname)
        print "test('%s', function() {" % stem
        with codecs.open(fpath, "r", "utf-8") as fin:
            counter = 0
            while True:
                line = fin.readline()
                if not line:
                    print
                    break
                if counter:
                    print ","
                inp, exp = line.strip().split(" ")
                print "  equal(parse_string('%(inp)s'), %(exp)s, '%(inp)s')" % locals(),
                counter += 1
        print "});"
        print
