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

* rotating shapes
* text rendering

* draw diagram of the code architecture
* clean up code
* * use linked list for storing vertices (renderer.js, verticesContainer.js)
* * better error handling
* frame buffers
* uniform buffers
* create geometry class for handling geometry
* more flexible camera control



* canvas resizes
* polish library



## Better Fixes

* Put a lot of the renderer code outside of the class

## Third Party Libraries
* math.Js (https://github.com/josdejong/mathjs)
