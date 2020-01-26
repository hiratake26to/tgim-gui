BABEL=npx babel
SRCS=index.js test.js

out: $(SRCS)
	$(BABEL) $^ --out-dir $@

run: out
	node out/test

clean:
	rm -fr out
