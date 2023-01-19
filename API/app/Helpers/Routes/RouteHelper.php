<?php

namespace App\Helpers\Routes;

class RouteHelper{

    public static function includeRouteFiles(string $folder)
    {
        //iterate v1 folder recusively
        $dirIterator = new \RecursiveDirectoryIterator($folder);
        /** @var \RecursiveDirectoryIterator | RecursiveIteratorIterator @it */
        $it = new \RecursiveIteratorIterator($dirIterator);

        while ($it->valid()) {
            if (
                !$it->isDot()
                && $it->isFile()
                && $it->isReadable()
                && $it->current()->getExtension() === 'php'
            ) {
                require $it->key();
            }
            $it->next();
        }
    }

}
