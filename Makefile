dist:
	npm install
	npm run build

.PHONY: clean

clean:
	rm -fr ./node_modules
	rm -fr ./test
	rm -fr ./dist
