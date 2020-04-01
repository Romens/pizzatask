<?php

namespace App\Jobs;

use App\Services\Integration\CBRService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateCurrencies implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     *
     * @param CBRService $service
     * @return void
     */
    public function handle(CBRService $service)
    {
        $service->syncCurrencies();
    }
}
