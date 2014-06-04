package bitmaxima;

import static java.lang.Math.random;

public class Main {

    public static double primes(int max){
        double s = 0.0;
        for (int i = 0; i < max; i++){
            s += 0.000001;
        }
        return s;
    }
    public static void main(String[] args) {
	    int number = 600000000;

        long startTime = System.nanoTime();
        double result = primes(number);
        long estimatedTime = System.nanoTime() - startTime;

        System.out.println(result);
        System.out.println(estimatedTime / 1000000000.0);

    }
}
