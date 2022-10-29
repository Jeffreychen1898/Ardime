# Ardime

A simple rendering library

# Navigating The Project

**Run The Code**

* Install the npm modules with the following commands: (If not already done so)
* Download all third party libraries (found below) in the folder ./test/views/

  * ```
    cd test
    npm install
    ```

* Run the project

  * ```
    cd test
    npx webpack build
    node index
    ```

**Compress The Library**

```
cd test
npx webpack build
```

## To Do

* shader abstraction (when shader is changed, make draw call)
* camera rotation
* better error handling
* text rendering

* frame buffers
* uniform buffers
* create geometry class for handling geometry
* use linked list for storing vertices (renderer.js, verticesContainer.js)



* canvas resizes
* polish library



## Better Fixes

* Put a lot of the renderer code outside of the class

## Third Party Libraries
* math.Js (https://github.com/josdejong/mathjs)